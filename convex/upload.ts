import { mutation } from "./_generated/server";

export const generatedUploadUrl = mutation(async (ctx) => {
    return ctx.storage.generateUploadUrl();
});