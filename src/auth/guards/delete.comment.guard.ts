import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import Session, { SessionContainer } from 'supertokens-node/recipe/session';
import prisma from '../../client';

@Injectable()
export class DeleteCommentGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const httpContext = context.switchToHttp();
    let session: SessionContainer;
    try {
      session = await Session.getSession(
        httpContext.getRequest(),
        httpContext.getResponse(),
      );
    } catch (err) {
      throw new UnauthorizedException('Unauthorized');
    }
    const path = httpContext.getRequest().path;
    let commentId: number;
    try {
      commentId = Number.parseInt(path.split('/')[2]);
    } catch (err) {
      throw new BadRequestException('Invalid comment id');
    }
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
    });
    if (comment == null) {
      throw new NotFoundException('Comment not found');
    }

    const userId = session.getUserId();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user.isAdmin && !user.isModerator && comment.userId != userId) {
      throw new ForbiddenException('Forbidden operation');
    }

    return true;
  }
}
