import app from './app.mjs';

const PORT = process.env.PORT || 4000;

const startServer = async () => {
    try {
        app.listen(PORT, async function() {
            console.log(`listening on port ${PORT}`);
        })
    } catch (e) {
        throw e;
    }
};

startServer().catch(e => console.error(e));
