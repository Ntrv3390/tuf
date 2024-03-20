import { connectToDB } from "@/db/db";
import { NextResponse } from "next/server";
import { redis } from "@/utils/redis";

connectToDB();
const getData = async () => {
    try {
        const cachedData = await redis.get('cachedData')
        if(cachedData) {
            return JSON.parse(cachedData);
        }
        const connection = connectToDB();
        const queryResult = await new Promise((resolve, reject) => {
            connection.query('SELECT * FROM tuf order by `added_on` desc', (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        connection.end();
        await redis.set('cachedData', JSON.stringify(queryResult));
        return queryResult;
    } catch (error) {
        throw new Error('Error fetching data from database: ' + error.message);
    }
};

const postData = async (data) => {
    try {
        const connection = connectToDB();
        const queryResult = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO tuf (username, lang, stdin, code) VALUES (?, ?, ?, ?)', [data.username, data.lang, data.stdin, data.code], (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
        connection.end();
        return queryResult;
    } catch (error) {
        throw new Error('Error inserting data into database: ' + error.message);
    }
};


export async function POST(request) {
    try {
        const data = await request.json();
        await postData(data);
        const cachedData = await redis.get('cachedData')
        const datas = JSON.parse(cachedData);
        data.added_on = new Date();
        datas.unshift(data);
        await redis.set('cachedData', JSON.stringify(datas))
        return NextResponse.json({ message: 'Data inserted successfully', success: true }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: error.message, success: false }, { status: 400 });
    }
}


export async function GET() {
    try {
        const results = await getData();
        return NextResponse.json({results: results, success:true}, {status: 201})
    } catch (error) {
        return NextResponse.json({message: error, success:false}, {status: 400})
    }
}
