import { FastifyError, FastifyRequest, FastifyReply } from "fastify";
import { randomUUID } from "crypto";
import fs from "fs";
import path from "path";

export function uploadHook(field: string) {
    return async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const file = request.body[field];
            const fileName = `${randomUUID()}-${file.filename}`;
            const filePath = path.resolve(__dirname, "..", "..", "uploads", fileName);


            fs.promises.writeFile(filePath, file._buf);
            const body = Object.fromEntries(
                Object.keys(request.body).map((key) => [key, request.body[key].value])
            )
            body[field] = {
                fileName: fileName,
                originalName: file.filename
            }
            request.body = body;
        } catch (error) {
            reply.status(401).send(error);
        }
    }

}