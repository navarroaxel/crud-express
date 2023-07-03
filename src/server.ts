import { Application } from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

export class Server {
    constructor(private port = process.env.PORT || 3000) {
    }

    launchServer(app : Application): void {
        app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }

    async connectDb(): Promise<void> {
        try {
            await mongoose.connect(process.env.DB_MONGO_URI || '', {
                socketTimeoutMS: 5000
            });
        } catch (error: unknown) {
            console.error(`MongoDB err: ${error}`);
        }
    }

    async run(app: Application): Promise<void> {
        this.connectDb();
        this.launchServer(app);
    }

}
