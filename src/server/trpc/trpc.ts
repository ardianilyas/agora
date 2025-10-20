import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import type { Context } from './context'
import { Role } from '@/generated/prisma';

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const router = t.router;
export const procedure = t.procedure;
export const middleware = t.middleware;

const isAuthed = t.middleware(({ ctx, next }) => {
  if(!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx: {
      user: ctx.session.user,
    },
  });
});

const isAdmin = t.middleware(({ ctx, next }) => {
  if(ctx.session?.user.role !== Role.ADMIN) {
    throw new TRPCError({ code: "FORBIDDEN", message: "You don't have access to this route" });
  };

  return next({
    ctx: {
      user: ctx.session.user,
    },
  });
});

export const authProcedure = t.procedure.use(isAuthed);
export const adminProcedure = authProcedure.use(isAdmin);