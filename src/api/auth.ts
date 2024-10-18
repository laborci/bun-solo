import {Cmd, type CometState, fqn} from "@laborci/comet";

@Cmd()
@Cmd.Middleware()
export class Auth {
	@Cmd()
	Sign_In() { return "Sign In";}

	@Cmd()
	signOut() { return "Sign Out";}

	@Cmd(fqn`who-am-i`)
	@Cmd.Middleware((state: CometState, next: Function) => {
		state.params.name = "LABORCI GERGELY";
		return next()
	})
	whoAmI(
		@Cmd.Param params: { name: string },
		@Cmd.Arg args: { name: string },
		@Cmd.Header h: { name: string },
	) {
		return `Who AmI? ${h.name}, ${args.name} or ${params.name}!`;
	}
}
