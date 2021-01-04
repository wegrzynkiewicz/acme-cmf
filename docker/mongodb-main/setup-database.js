db.createUser({
    user: 'main',
    pwd: 'main',
    roles: [
        {
            role: 'readWrite',
            db: 'main',
        },
    ],
});
