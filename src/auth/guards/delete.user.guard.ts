import {
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
export class DeleteUserGuard implements CanActivate {
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
    const userName = path.split('/')[2];
    const userToDelete = await prisma.user.findUnique({
      where: { name: userName },
    });
    if (userToDelete == null) {
      throw new NotFoundException('User ' + userName + ' not found');
    }

    const userId = session.getUserId();
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user.isAdmin && userToDelete.id != userId) {
      throw new ForbiddenException('Forbidden operation');
    }

    return true;
  }
}
