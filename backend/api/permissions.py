from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsSuperAdmin(BasePermission):
    """
    Superadmin: Full system control, global settings, creates Admins.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            (request.user.role == 'superadmin' or request.user.is_superuser)
        )


class IsAdmin(BasePermission):
    """
    Admin (Branch Head): Can manage Managers, Employees, view global revenue,
    and access all events/tasks.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['superadmin', 'admin']
        )


class IsManager(BasePermission):
    """
    Manager (Event Lead): Can create events, design menus, and assign tasks.
    """
    def has_permission(self, request, view):
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['superadmin', 'admin', 'manager']
        )


class IsStaffUser(BasePermission):
    """
    Any authenticated active staff member (superadmin, admin, manager, employee).
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_active)


class EventPermission(BasePermission):
    """
    - SuperAdmin / Admin: Full CRUD on all events.
    - Manager: Can view, create, and update events assigned to them.
    - Employee: Read-only access to events where they are assigned tasks.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.role == 'employee':
            return request.method in SAFE_METHODS
        return True

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not (user and user.is_authenticated):
            return False
        if user.role in ['superadmin', 'admin']:
            return True
        if user.role == 'manager':
            if request.method in SAFE_METHODS:
                return True
            return obj.assigned_manager == user or obj.assigned_manager is None
        if user.role == 'employee':
            return request.method in SAFE_METHODS
        return False


class FinancialPermission(BasePermission):
    """
    Finance (Sales Invoices, Billing, Financial Reports, Payments):
    - Superadmin & Admin: Full access.
    - Manager: Allowed to view/create Sales Invoices and POs for events they manage.
    - Employee: Strictly NO ACCESS (Forbidden).
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False
        if request.user.role == 'employee':
            return False
        return True


class IsTaskParticipantOrHigher(BasePermission):
    """
    Task endpoint permission policy:
    - Superadmin & Admin: Full access to all tasks.
    - Manager: Can view, create, update, and delete tasks for events they manage.
    - Employee: Can ONLY view tasks assigned to them and update their status (PATCH/PUT).
      CANNOT create (POST) or delete (DELETE) tasks.
    """
    def has_permission(self, request, view):
        if not (request.user and request.user.is_authenticated):
            return False

        # Employees cannot create (POST) or bulk-delete tasks
        if request.user.role == 'employee' and request.method not in ['GET', 'PUT', 'PATCH', 'HEAD', 'OPTIONS']:
            return False

        return True

    def has_object_permission(self, request, view, obj):
        user = request.user
        if not (user and user.is_authenticated):
            return False

        # Superadmin & Admin have unrestricted access
        if user.role in ['superadmin', 'admin']:
            return True

        # Manager has access only if linked event is managed by them or created by them
        if user.role == 'manager':
            if obj.event and obj.event.assigned_manager == user:
                return True
            if obj.assigned_by == user:
                return True
            return False

        # Employee: Can only view or update (PUT/PATCH) their specific task
        if user.role == 'employee':
            if obj.assigned_to != user:
                return False
            # Disallow DELETE
            if request.method in ['DELETE']:
                return False
            return True

        return False

