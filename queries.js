const Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST ?? 'localhost',
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
});

async function getPost() {
    try {
        const result = await pool.query(
            'select * from post'
        );
        return result.rows;
    } catch (error) {
        return error;
    }
}

async function getPostById(id) {
    try {
        const result = await pool.query('SELECT * FROM post WHERE id = $1', [id]);
        return result?.rows[0];
    } catch (error) {
        return error;
    }
}
async function createPost(author, subscribers, title, content, img, published) {
    try {
        const result = await pool.query(
            'INSERT INTO post (author, subscribers, title, content, img, published) \ ' +
            'VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [author, subscribers, title, content, img, published]
        );
        return result.rows[0]?.id;
    } catch (error) {
        return error;
    }
}

async function updatePost(author, subscribers, title, content, img, published, id) {
    try {
        const result = await pool.query(
            'UPDATE post SET author = $1, subscribers = $2, title = $3, \
                content = $4, img = $5, published = $6 WHERE id = $8',
            [author, subscribers, title, content, img, published, id]
        );
        return result.rows;
    } catch (error) {
        return error;
    }
}

async function deletePost(id) {
    try {
        const result = await pool.query('DELETE FROM post WHERE id = $1', [id]);
        return result.rows;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getPost,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
