import { prisma } from "../db";

interface SaveFileProps {
    avatar: {
        originalName: string;
        fileName: string;
    };
}

export class FileRepository {
    client = prisma.file;

    async create(data: SaveFileProps) {
        const { avatar } = data; 

        const savedFile = await this.client.create({
            data: {
                fileName: avatar.fileName, 
                originalName: avatar.originalName,
            },
        });

        return savedFile;
    }
}
