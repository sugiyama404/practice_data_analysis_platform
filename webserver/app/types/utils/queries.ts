export const getallitem: string = `
    SELECT id, name, jp_name, image_path, price FROM items;
`;

export const getitem = (id: number) => {
    return `
    SELECT id, name, jp_name,description, image_path, price FROM items WHERE id = ${id};
    `
}

export const IsUser = (email: string, password: string) => {
    return `
    SELECT id, username, password, email FROM users WHERE email = '${email}' AND password = '${password}';
    `
}
