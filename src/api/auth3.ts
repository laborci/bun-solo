import {Cmd, fqn, type CometState} from "@laborci/comet";
import {Auth2} from "./auth2.ts";

@Cmd("auth-3")
@Cmd.Omit("signIn")
@Cmd.Remap({"signIn": fqn`log-in`})
export class Auth3 extends Auth2 {
	@Cmd()
	changePassword(
		@Cmd.Cookie hce: { name: string },
		@Cmd.Env env: { name: string },
		@Cmd.Param params: { name: string },
		@Cmd.Arg args: { name: string },
		@Cmd.Header he: { name: string },
	) { return "";}
}