import { Controller, Post, UseInterceptors, UploadedFiles, UseGuards } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { v4 as uuid } from 'uuid';

@Controller('storage')
export class StorageController {
    @Post('upload')
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FilesInterceptor('files', 10, {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueSuffix = uuid();
                cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
                return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
        },
    }))
    uploadFiles(@UploadedFiles() files: Express.Multer.File[]) {
        const urls = files.map(file => `http://localhost:4000/uploads/${file.filename}`);
        return { urls };
    }
}
