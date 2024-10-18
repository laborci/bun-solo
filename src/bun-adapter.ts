import type {CometAdapter, CometRequest, CometResult} from "@laborci/comet";

export class BunAdapter implements CometAdapter {

	constructor() {}

	async requestParser(request: Request): Promise<CometRequest> {

		// METHOD
		let method = request.method.toUpperCase()

		// URL
		let url = URL.parse(request.url)!

		// PARAMS
		let params: Record<string, any> = {}
		url.searchParams.forEach((value, key: string) => params[key] = value)

		// HEADERS
		let headers: Record<string, any> = {};
		request.headers.forEach((value, key: string) => headers[key] = value);

		// COOKIES
		let cookies: Record<string, any> = request.headers.has("Cookie") ? this.parseCookieHeader(request.headers.get("Cookie") as string) : {};
		let contentType = request.headers.get("Content-Type");

		// ARGS & FILES
		let args: any;
		let files: any;
		if (contentType === "application/json") {
			args = await request.json();
			files = {}
		} else {
			// todo: form handling
		}

		return {method, url, contentType, params, files, args, headers, cookies}
	}
	async responseFactory(result: CometResult): Promise<Response> {
		switch (result.type) {
			case "json":
				return this.responseFactoryJson(result);
			case "text":
				return this.responseFactoryText(result);
			case "file":
				return this.responseFactoryFile(result);
		}
	}

	async responseFactoryJson(result: CometResult): Promise<Response> {
		return Response.json(result.result, {status: result.status});
	}
	async responseFactoryText(result: CometResult): Promise<Response> {
		return new Response(result.result, {status: result.status});
	}
	async responseFactoryFile(result: CometResult): Promise<Response> {
		const file = Bun.file(result.result);
		return new Response(file);
	}

	parseCookieHeader(cookieHeader: string): Record<string, string> {
		const cookies: Record<string, string> = {};
		cookieHeader.split(";").forEach(cookie => {
			const [name, ...rest] = cookie.split("=");
			cookies[name.trim()] = rest.join("=").trim();
		});
		return cookies;
	}
}
