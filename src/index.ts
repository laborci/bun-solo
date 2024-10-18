import {CometServer, CommandApi, FileServerApi, measureMiddleware} from "@laborci/comet";
import {Auth} from "./api/auth.ts";
import {Auth2} from "./api/auth2.ts";
import {Auth3} from "./api/auth3.ts";
import {BunAdapter} from "./bun-adapter.ts";
// import {BunAdapter} from "./comet-bun/bun-adapter.ts";
// import {CommandApi} from "./comet/api/command-api.ts";
// import {FileServerApi} from "./comet/api/file-server-api.ts";
// import {measureMiddleware} from "./comet/middlewares/measure.ts";
// import {CometServer} from "./comet/server.ts";


console.log("--------")


let comet = new CometServer(
	new BunAdapter(),
	[
		new FileServerApi("fs", `${__dirname}/../var/`, [measureMiddleware()]),
		new CommandApi("api/1", [new Auth()], [measureMiddleware()]),
		new CommandApi("api/2", [new Auth2()]),
		new CommandApi("phone-api/2", [new Auth3()]),
	]
);


Bun.serve({
	port: 3000,
	async fetch(request: Request): Promise<Response> {
		return (
			await comet.serve(request) ||
			new Response("NOT FOUND", {status: 404})
		);
	},
	error() { return new Response(null, {status: 404});}
});

console.log("http://localhost:3000/fs/comet.jpg")