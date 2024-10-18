import {Cmd, fqn, type CometState} from "@laborci/comet";
import {Auth} from "./auth.ts";

@Cmd("auth-2")
@Cmd.Middleware()
export class Auth2 extends Auth {
	@Cmd()
	signIn() { return "Sign In máshogy";}
}