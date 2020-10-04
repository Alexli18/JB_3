// this part relevant to admin only
const ADD_VACATION = 'INSERT INTO `vacations`(description`, `destination`, `img`, `start_date`, `finish_date`, `price`, `followers`) VALUES (?,?,?,?,?,?,?)';
const DELETE_VACATION = 'DELETE FROM `vacations` WHERE `vacations`.`id` = ?';
const EDIT_VACATION = 'UPDATE `vacations` SET `description`= ?,`destination`= ?,`img`= ?,`start_date`= ?,`finish_date`= ?,`price`= ? WHERE `id`= ?';
const GET_ALL_VACATIONS = 'SELECT * FROM `vacations`';


// this part relevant to user
const ADD_TO_LIST = '';
const DELETE_FROM_LIST = '';


const addVacation = (vacation) => {
    const {description, destination, img, start_date, finish_date, price} = vacation;
    start_date = start_date.toISOString();
    // last parameter is 0 (is followers number)
    return global.mysqlConnection.execute(ADD_VACATION, [description, destination, img, start_date, finish_date, price, 0]);
}

const deleteVacation = (vacation) => {
    const { id } = vacation;
    return global.mysqlConnection.execute(DELETE_VACATION, [id]);
}

const editVacation = (vacation) => {
    const { description, destination, img, start_date, finish_date, price, id } = vacation;
    const sqlStartDate = start_date.toISOString();
    const sqlFinishDate = finish_date.toISOString();
    return global.mysqlConnection.execute(EDIT_VACATION, [description, destination, img, sqlStartDate, sqlFinishDate, price, id]);
}


const getAllVacations = () => {
    return global.mysqlConnection.execute(GET_ALL_VACATIONS);
}

module.exports = {
    addVacation,
    deleteVacation,
    editVacation,
    getAllVacations
}