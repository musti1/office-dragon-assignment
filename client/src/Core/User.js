class User {
  constructor(
    userId,
    userName,
    thumbnail,
    firstName,
    lastName,
    email,
    street,
    city,
    state,
    postcode,
    phone,
    cell
  ) {
    this.userId = userId;
    this.userName = userName;
    this.thumbnail = thumbnail;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.street = street;
    this.city = city;
    this.state = state;
    this.postcode = postcode;
    this.phone = phone;
    this.cell = cell;
  }
  static createFromObj(obj) {
    return new User(
      obj.login.uuid,
      obj.login.username,
      obj.picture.thumbnail,
      obj.name.first,
      obj.name.last,
      obj.email,
      obj.location.street,
      obj.location.city,
      obj.location.state,
      obj.location.postcode,
      obj.phone,
      obj.cell
    );
  }
}
export default User;
