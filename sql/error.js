const handleSQLError = (res, err) => {
    console.log('SQL Error: ', err)
    return res.status(500).send('A REALLY unexpected error occurred');
  }
  
  module.exports = { handleSQLError }