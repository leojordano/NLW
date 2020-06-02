import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('items').insert([
        {title: 'Lampadas', image: "lampadas"},
        {title: 'Pilhas e Baterias', image: "baterias"},
        {title: 'Papeis e Papelão', image: "papeis-papelao"},
        {title: 'Residuos Eletronicos', image: "eletronicos"},
        {title: 'Residuos Organicos', image: "organicos"},
        {title: 'Óleo de Cozinha', image: "oleo"},
    ])
}