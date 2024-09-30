import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";


export const create = mutation({
    args: {
        workspaceId: v.id("workspaces"),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) throw new Error("Unauthorized");

        // Get the member record for the current user and workspace
        const member = await ctx.db.query("members")
            .withIndex("by_user_id_and_workspace_id", (q) => q
                .eq("userId", userId)
                .eq("workspaceId", args.workspaceId))   
            .unique();

        if (!member || member.role !== 'admin') throw new Error("Unauthorized");


        const parseName = args.name.replace(/\s+/g, "-").toLocaleLowerCase();

        // Create the channel
        const channelId = await ctx.db.insert("channels", {
            workspaceId: args.workspaceId,
            name: parseName,
        });

        return channelId;
    }
})

export const get = query({
    args: {workspaceId: v.id("workspaces")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return [];

        // Get the member record for the current user and workspace
        const member = await ctx.db.query("members").withIndex("by_user_id_and_workspace_id", (q) => q.eq("userId", userId).eq("workspaceId", args.workspaceId)).unique();
        if (!member) return [];

        // Get all channels for the workspace
        const channels = await ctx.db.query("channels")
            .withIndex("by_workspace_id", (q) => q.eq("workspaceId", args.workspaceId))
            .collect();

        return channels;
    }
})

export const getById = query({
    args: {id: v.id("channels")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if (!userId) return null;

        // Get the channel
        const channel = await ctx.db.get(args.id);
        if (!channel) return null;

        const member = await ctx.db
            .query("members")
            .withIndex("by_user_id_and_workspace_id", (q) => 
                q.eq("userId", userId)
                .eq("workspaceId", channel.workspaceId))
            .unique();

        if(!member) return null;

        return channel;
    }
})

export const update = mutation({
	args: {
        id: v.id('channels'), 
        name: v.string(), 
    },
	handler: async(ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new Error('Unauthorized');
		}

        const channel = await ctx.db.get(args.id);
        if (!channel) throw new Error("Channel not found");

        const member = await ctx.db.query('members')
            .withIndex('by_user_id_and_workspace_id', (q) => q
                .eq("userId", userId)
                .eq("workspaceId", channel.workspaceId))
            .unique();
        if (!member || member.role !== 'admin') throw new Error("Unauthorized");

        const parseName = args.name.replace(/\s+/g, "-").toLocaleLowerCase();

        await ctx.db.patch(channel._id, {name: parseName});
		
        return args.id;

		
	}
})

export const remove = mutation({
	args: {id: v.id('channels')},
	handler: async(ctx, args) => {
		const userId = await getAuthUserId(ctx);

		if (!userId) {
			throw new Error('Unauthorized');
		}

        const channel = await ctx.db.get(args.id);
        if (!channel) throw new Error("Channel not found");

        const member = await ctx.db.query('members')
            .withIndex('by_user_id_and_workspace_id', (q) => q
                .eq("userId", userId)
                .eq("workspaceId", channel.workspaceId))
            .unique();
        if (!member || member.role !== 'admin') throw new Error("Unauthorized");

        // TODO : Delete all messages in the channel

		// NOTE : Delete workspace
		await ctx.db.delete(channel._id,);

		return args.id; 
	}
})