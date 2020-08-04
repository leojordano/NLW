import { Request, Response } from 'express'

import converTHoursToMinutes from '../utils/convertHourToMinutes'
import db from '../database/conn'


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}

export default class ClassesController {
    async teste(req: Request, res: Response) {
        const users = await db('users').select('*')
    
        return res.json(users)
    }

    async index(req: Request, res: Response) {
        const filters = req.query

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if(!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).json({
                error: 'Missing filters to search classes'
            })
        }
        
        const timeInMinutes = converTHoursToMinutes(time)

        const classes = await db('classes')
                .whereExists(function() {
                    this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id` = `classes`. `id`')
                        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                })
                .where('classes.subject', '=', subject)
                .join('users', 'classes.user_id', '=', 'users.id')
                .select(['classes.*', 'users.*']) 

        return res.json(classes)
    }

    async create(req: Request, res: Response) {
        const { name, avatar, wpp, bio, subject, cost, schedule } = req.body

        const trx = await db.transaction()
    
        try {
            const insertUserIds = await trx('users').insert({
                name, avatar, wpp, bio
            })
        
            const user_id = insertUserIds[0]
        
            const insertedClassesId = await trx('classes').insert({
                subject,
                cost,
                user_id
            })
        
            const class_id = insertedClassesId[0]
        
            const classSchedule = schedule.map((item: ScheduleItem) => {
                return {
                    class_id,
                    week_day: item.week_day,
                    from: converTHoursToMinutes(item.from),
                    to: converTHoursToMinutes(item.to)
                }
            })
        
            await trx('class_schedule').insert(classSchedule)
        
            await trx.commit()
        
            return res.status(201).json({ message: 'Created with Sucess!!' })
        } catch (err) {
            await trx.rollback()
    
            return res.status(400).json({
                error: 'Unexpected error while new class'
            })
        }
    }
}