"use client"
import { authProvider } from "@providers/auth-provider";
import { AccessControlProvider } from "@refinedev/core";

export const accessControlPorvider: AccessControlProvider = {
    options: {
        buttons: {
            enableAccessControl: true,
            hideIfUnauthorized: true,

        }
    },
    can: async ({ resource, action }) => {
        if (authProvider && typeof authProvider.getPermissions === 'function') {
            const permissions = await authProvider.getPermissions() as string[]
            const permission = `${resource?.toUpperCase()}_${action.toUpperCase()}`
            return {
                can: permissions.includes(permission),
            }
        }
        return {
            can: false,
        };
    },
} 
