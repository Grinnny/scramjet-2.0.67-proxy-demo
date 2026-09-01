import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { server as wisp, logging } from "@mercuryworkshop/wisp-js/server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

logging.set_level(logging.NONE);

const app = Fastify({
    logger: false,
});

await app.register(fastifyStatic, {
    root: path.join(__dirname, "../public"),
});

await app.register(fastifyStatic, {
    root: path.join(
        __dirname,
        "../node_modules/@mercuryworkshop/scramjet/dist"
    ),
    prefix: "/scramjet/",
    decorateReply: false,
});

await app.register(fastifyStatic, {
    root: path.join(
        __dirname,
        "../node_modules/@mercuryworkshop/scramjet-controller/dist"
    ),
    prefix: "/controller/",
    decorateReply: false,
});

await app.register(fastifyStatic, {
    root: path.join(
        __dirname,
        "../node_modules/@mercuryworkshop/libcurl-transport/dist"
    ),
    prefix: "/libcurl/",
    decorateReply: false,
});

await app.register(fastifyStatic, {
    root: path.join(
        __dirname,
        "../node_modules/@mercuryworkshop/epoxy-transport/dist"
    ),
    prefix: "/epoxy/",
    decorateReply: false,
});

app.get("/", async (request, reply) => {
    return reply.sendFile("index.html");
});

app.setNotFoundHandler((request, reply) => {
    console.log("FASTIFY 404:", request.method, request.url);
    reply.code(404).send("Not found");
});

app.server.on("upgrade", (req, socket, head) => {
    if (req.url?.startsWith("/wisp/")) {
        wisp.routeRequest(req, socket, head);
    } else {
        socket.end();
    }
});

try {
    await app.listen({
        host: "127.0.0.1",
        port: 8080,
    });

    console.log("HTTP server: http://localhost:8080");
    console.log("Wisp server: ws://localhost:8080/wisp/");
} catch (error) {
    app.log.error(error);
    process.exit(1);
}
