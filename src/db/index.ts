import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient().$extends({
    result: {
        file: {
            url: {
                needs: { filename: true },
                compute(file) {
                    const url = `http://localhost:3000/public/${file.filename}`;
                    return url;
                }
            }
        }
    }
});