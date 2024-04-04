import { UseGuards } from '@nestjs/common';
import { GoogleOauthGuard } from 'src/guard/google-auth.guard';

export const GoogleDecor = () => UseGuards(GoogleOauthGuard);
