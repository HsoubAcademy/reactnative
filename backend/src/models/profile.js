const profile = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        speialization: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        workingHours: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        }
    });

    Profile.associate = models => {
        Profile.belongsTo(models.User);
    }
    return Profile;
}

export default profile;