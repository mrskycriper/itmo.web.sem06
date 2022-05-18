import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import Session, { SessionContainer } from 'supertokens-node/recipe/session';
import SuperTokens from 'supertokens-node/lib/build/supertokens';

@Injectable()
export class WsChatGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const wsContext = context.switchToWs();
    // let session: SessionContainer;
    // try {
    //   session = await Session.getSession(
    //     httpContext.get
    //     httpContext.getResponse(),
    //   );
    // } catch (err) {
    //   throw new UnauthorizedException('Unauthorized');
    // }
    console.log(wsContext.getClient());
    console.log(wsContext.getData());

    return true;
  }
}
