import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthDTO } from "./dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  register(@Body() authDTO: AuthDTO) {
    return this.authService.register(authDTO);
  }

  @Post("/login")
  login(@Body() authDTO: AuthDTO) {
    return this.authService.login(authDTO);
  }
}