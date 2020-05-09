const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig(), {
  mode: 'development',
  entry: [
    __dirname + '/../src/components/bulma/navbar/navbar.ts',
    __dirname + '/../src/components/bulma/pagination/pagination.ts',
    __dirname + '/../src/components/bulma/addon/addon.ts',
    __dirname + '/../src/components/bulma/field/field.ts',
    __dirname + '/../src/components/bulma/icon/icon.ts',
    __dirname + '/../src/components/bulma/input/input.ts',
    __dirname + '/../src/components/bulma/modal/modal.ts',
    __dirname + '/../src/components/bulma/select/select.ts',
    __dirname + '/../src/components/bulma/table/table.ts',
    __dirname + '/../src/components/form-login/form-login.ts',
    __dirname + '/../src/components/form-signup/form-signup.ts',
    __dirname + '/../src/components/form-user/form-user.ts',
    __dirname + '/../src/components/table-alert/table-alert.ts',
    __dirname + '/../src/components/table-device/table-device.ts',
    __dirname + '/../src/components/table-user/table-user.ts',
    __dirname + '/../src/components/topnav/topnav.ts',
    __dirname + '/../src/pages/dashboard/dashboard.ts'
  ]
});
