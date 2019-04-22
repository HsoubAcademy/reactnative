const user = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING
        },
        userType: {
            type: DataTypes.ENUM('doctor', 'normal'),
        },
        latitude: {
            type: DataTypes.FLOAT,
        },
        longitude: {
            type: DataTypes.FLOAT
        }
    });

    User.associate = models => {
        User.hasOne(models.Profile);
    }
    return User;
}

export default user;