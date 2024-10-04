import { getModelByName } from '@adminjs/prisma';
import componentLoader from './component-loader.js';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();
const options = {
    componentLoader,
    rootPath: '/admin',
    resources: [
        {
            resource: {
                model: getModelByName('Post'),
                client: prisma,
            },
            options: {
                navigation: {
                    name: 'Content',
                    icon: 'book',
                },
                properties: {
                    password: {
                        isVisible: { list: false, edit: true, show: false },
                    },
                },
            },
        },
        {
            resource: {
                model: getModelByName('User'),
                client: prisma,
            },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            if (request.payload?.password) {
                                request.payload.password = await bcrypt.hash(request.payload.password, 10);
                            }
                            return request;
                        },
                    },
                    show: {
                        after: async (response) => {
                            response.record.params.password = '';
                            return response;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            if (request.method === 'post') {
                                if (request.payload?.password) {
                                    request.payload.password = await bcrypt.hash(request.payload.password, 10);
                                }
                                else {
                                    delete request.payload?.password;
                                }
                            }
                            return request;
                        },
                        after: async (response) => {
                            response.record.params.password = '';
                            return response;
                        },
                    },
                    list: {
                        after: async (response) => {
                            response.records.forEach((record) => {
                                record.params.password = '';
                            });
                            return response;
                        },
                    },
                },
                navigation: {
                    name: 'Users',
                    icon: 'User',
                },
                properties: {
                    id: {
                        isVisible: { list: false, edit: true, show: false, false: false },
                    },
                },
            },
        },
    ],
    branding: {
        companyName: 'Admin company',
    },
    assets: {
        styles: ['/admin.css'],
    },
};
export default options;
