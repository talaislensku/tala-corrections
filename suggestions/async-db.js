export default class AsyncDb {
  constructor(db) {
    this.db = db
  }

  get(key) {
    return new Promise((resolve, reject) =>
      this.db.get(key, (err, result) => {
        if (err && err.type === 'NotFoundError') resolve(null)
        return err ? reject(err) : resolve(result)
      }))
  }

  put(key, value) {
    return new Promise((resolve, reject) =>
      this.db.put(key, value, err =>
        err ? reject(err) : resolve()))
  }
}
