import axios from 'axios'

/* eslint-disable */

// This is a generated file.
// See README.md file for update instructions

export default class System {
  constructor ({baseURL, headers, jwt} = {}) {
    this.jwt = null
    this.baseURL = baseURL

    this.headers = {
      'Content-Type': 'application/json',
    }

    this.setHeaders(headers)

    jwt = jwt || localStorage.getItem('auth.jwt')

    if (this.isValidJWT(jwt)) {
      this.setJWT(jwt)
    }
  }

  setJWT (jwt) {
    if (this.isValidJWT(jwt)) {
      this.jwt = jwt
      this.headers['Authorization'] = 'Bearer ' + jwt
    } else {
      throw new Error('JWT value too short', {
        jwt,
      })
    }

    return this
  }

  setHeaders (headers) {
    if (typeof headers === 'object') {
      this.headers = headers
    }

    return this
  }

  isValidJWT (jwt) {
    return jwt && jwt.length > 100
  }

  stdReject (reject) {
    return (error) => {
      reject(error)
    }
  }

  stdResolve (resolve, reject) {
    return (response) => {
      if (response.data.error) {
        reject(response.data.error)
      } else {
        resolve(response.data.response)
      }
    }
  }

  api () {
    return axios.create({
      withCredentials: true,
      baseURL: this.baseURL,
      headers: this.headers,
    })
  }

  // Returns auth settings
  async authSettings () {


    let cfg = {
      method: 'get',
      url: this.authSettingsEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authSettingsEndpoint () {
    return `/auth/`
  }

  // Check JWT token
  async authCheck () {


    let cfg = {
      method: 'get',
      url: this.authCheckEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authCheckEndpoint () {
    return `/auth/check`
  }

  // Exchange auth token for JWT
  async authExchangeAuthToken ({token, } = {}) {
    if (!token) {
      throw Error('Field token is empty')
    }

    let cfg = {
      method: 'post',
      url: this.authExchangeAuthTokenEndpoint({  }),
    }

    cfg.data = {
      token,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authExchangeAuthTokenEndpoint () {
    return `/auth/exchange`
  }

  // Logout
  async authLogout () {


    let cfg = {
      method: 'get',
      url: this.authLogoutEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authLogoutEndpoint () {
    return `/auth/logout`
  }

  // Login user
  async authInternalLogin ({email, password, } = {}) {
    if (!email) {
      throw Error('Field email is empty')
    }
    if (!password) {
      throw Error('Field password is empty')
    }

    let cfg = {
      method: 'post',
      url: this.authInternalLoginEndpoint({  }),
    }

    cfg.data = {
      email,
      password,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authInternalLoginEndpoint () {
    return `/auth/internal/login`
  }

  // User signup/registration
  async authInternalSignup ({email, username, password, handle, name, } = {}) {
    if (!email) {
      throw Error('Field email is empty')
    }
    if (!password) {
      throw Error('Field password is empty')
    }

    let cfg = {
      method: 'post',
      url: this.authInternalSignupEndpoint({  }),
    }

    cfg.data = {
      email,
      username,
      password,
      handle,
      name,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authInternalSignupEndpoint () {
    return `/auth/internal/signup`
  }

  // Request password reset token (via email)
  async authInternalRequestPasswordReset ({email, } = {}) {
    if (!email) {
      throw Error('Field email is empty')
    }

    let cfg = {
      method: 'post',
      url: this.authInternalRequestPasswordResetEndpoint({  }),
    }

    cfg.data = {
      email,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authInternalRequestPasswordResetEndpoint () {
    return `/auth/internal/request-password-reset`
  }

  // Exchange password reset token for new token and user info
  async authInternalExchangePasswordResetToken ({token, } = {}) {
    if (!token) {
      throw Error('Field token is empty')
    }

    let cfg = {
      method: 'post',
      url: this.authInternalExchangePasswordResetTokenEndpoint({  }),
    }

    cfg.data = {
      token,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authInternalExchangePasswordResetTokenEndpoint () {
    return `/auth/internal/exchange-password-reset-token`
  }

  // Reset password with exchanged password reset token
  async authInternalResetPassword ({token, password, } = {}) {
    if (!token) {
      throw Error('Field token is empty')
    }
    if (!password) {
      throw Error('Field password is empty')
    }

    let cfg = {
      method: 'post',
      url: this.authInternalResetPasswordEndpoint({  }),
    }

    cfg.data = {
      token,
      password,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authInternalResetPasswordEndpoint () {
    return `/auth/internal/reset-password`
  }

  // Confirm email with token
  async authInternalConfirmEmail ({token, } = {}) {
    if (!token) {
      throw Error('Field token is empty')
    }

    let cfg = {
      method: 'post',
      url: this.authInternalConfirmEmailEndpoint({  }),
    }

    cfg.data = {
      token,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authInternalConfirmEmailEndpoint () {
    return `/auth/internal/confirm-email`
  }

  // Changes password for current user, requires current password
  async authInternalChangePassword ({oldPassword, newPassword, } = {}) {
    if (!oldPassword) {
      throw Error('Field oldPassword is empty')
    }
    if (!newPassword) {
      throw Error('Field newPassword is empty')
    }

    let cfg = {
      method: 'post',
      url: this.authInternalChangePasswordEndpoint({  }),
    }

    cfg.data = {
      oldPassword,
      newPassword,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  authInternalChangePasswordEndpoint () {
    return `/auth/internal/change-password`
  }

  // List settings
  async settingsList ({prefix, } = {}) {


    let cfg = {
      method: 'get',
      url: this.settingsListEndpoint({  }),
    }
    cfg.params = {
      prefix,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  settingsListEndpoint () {
    return `/settings/`
  }

  // Update settings
  async settingsUpdate ({values, } = {}) {
    if (!values) {
      throw Error('Field values is empty')
    }

    let cfg = {
      method: 'patch',
      url: this.settingsUpdateEndpoint({  }),
    }

    cfg.data = {
      values,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  settingsUpdateEndpoint () {
    return `/settings/`
  }

  // Check JWT token
  async settingsGet ({key, ownerID, } = {}) {
    if (!key) {
      throw Error('Field key is empty')
    }

    let cfg = {
      method: 'get',
      url: this.settingsGetEndpoint({
        key,
      }),
    }
    cfg.params = {
      ownerID,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  settingsGetEndpoint ({key, } = {}) {
    return `/settings/${key}`
  }

  // Set a value for a key
  async settingsSet ({key, ownerID, value, } = {}) {
    if (!key) {
      throw Error('Field key is empty')
    }
    if (!value) {
      throw Error('Field value is empty')
    }

    let cfg = {
      method: 'put',
      url: this.settingsSetEndpoint({
        key,
      }),
    }

    cfg.data = {
      ownerID,
      value,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  settingsSetEndpoint ({key, } = {}) {
    return `/settings/${key}`
  }

  // List organisations
  async organisationList ({query, } = {}) {


    let cfg = {
      method: 'get',
      url: this.organisationListEndpoint({  }),
    }
    cfg.params = {
      query,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  organisationListEndpoint () {
    return `/organisations/`
  }

  // Create organisation
  async organisationCreate ({name, } = {}) {
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'post',
      url: this.organisationCreateEndpoint({  }),
    }

    cfg.data = {
      name,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  organisationCreateEndpoint () {
    return `/organisations/`
  }

  // Update organisation details
  async organisationUpdate ({id, name, } = {}) {
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'put',
      url: this.organisationUpdateEndpoint({
        id,
      }),
    }

    cfg.data = {
      name,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  organisationUpdateEndpoint ({id, } = {}) {
    return `/organisations/${id}`
  }

  // Remove organisation
  async organisationDelete ({id, } = {}) {
    if (!id) {
      throw Error('Field id is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.organisationDeleteEndpoint({
        id,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  organisationDeleteEndpoint ({id, } = {}) {
    return `/organisations/${id}`
  }

  // Read organisation details
  async organisationRead ({id, } = {}) {
    if (!id) {
      throw Error('Field id is empty')
    }

    let cfg = {
      method: 'get',
      url: this.organisationReadEndpoint({  }),
    }
    cfg.params = {
      id,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  organisationReadEndpoint () {
    return `/organisations/${id}`
  }

  // Archive organisation
  async organisationArchive ({id, } = {}) {
    if (!id) {
      throw Error('Field id is empty')
    }

    let cfg = {
      method: 'post',
      url: this.organisationArchiveEndpoint({
        id,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  organisationArchiveEndpoint ({id, } = {}) {
    return `/organisations/${id}/archive`
  }

  // List roles
  async roleList ({query, } = {}) {


    let cfg = {
      method: 'get',
      url: this.roleListEndpoint({  }),
    }
    cfg.params = {
      query,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleListEndpoint () {
    return `/roles/`
  }

  // Update role details
  async roleCreate ({name, members, } = {}) {
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'post',
      url: this.roleCreateEndpoint({  }),
    }

    cfg.data = {
      name,
      members,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleCreateEndpoint () {
    return `/roles/`
  }

  // Update role details
  async roleUpdate ({roleID, name, members, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'put',
      url: this.roleUpdateEndpoint({
        roleID,
      }),
    }

    cfg.data = {
      name,
      members,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleUpdateEndpoint ({roleID, } = {}) {
    return `/roles/${roleID}`
  }

  // Read role details and memberships
  async roleRead ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.roleReadEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleReadEndpoint ({roleID, } = {}) {
    return `/roles/${roleID}`
  }

  // Remove role
  async roleDelete ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.roleDeleteEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleDeleteEndpoint ({roleID, } = {}) {
    return `/roles/${roleID}`
  }

  // Archive role
  async roleArchive ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.roleArchiveEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleArchiveEndpoint ({roleID, } = {}) {
    return `/roles/${roleID}/archive`
  }

  // Move role to different organisation
  async roleMove ({roleID, organisationID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }
    if (!organisationID) {
      throw Error('Field organisationID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.roleMoveEndpoint({
        roleID,
      }),
    }

    cfg.data = {
      organisationID,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleMoveEndpoint ({roleID, } = {}) {
    return `/roles/${roleID}/move`
  }

  // Merge one role into another
  async roleMerge ({roleID, destination, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }
    if (!destination) {
      throw Error('Field destination is empty')
    }

    let cfg = {
      method: 'post',
      url: this.roleMergeEndpoint({
        roleID,
      }),
    }

    cfg.data = {
      destination,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleMergeEndpoint ({roleID, } = {}) {
    return `/roles/${roleID}/merge`
  }

  // Returns all role members
  async roleMemberList ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.roleMemberListEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleMemberListEndpoint ({roleID, } = {}) {
    return `/roles/${roleID}/members`
  }

  // Add member to a role
  async roleMemberAdd ({roleID, userID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.roleMemberAddEndpoint({
        roleID,
        userID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleMemberAddEndpoint ({roleID, userID, } = {}) {
    return `/roles/${roleID}/member/${userID}`
  }

  // Remove member from a role
  async roleMemberRemove ({roleID, userID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.roleMemberRemoveEndpoint({
        roleID,
        userID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  roleMemberRemoveEndpoint ({roleID, userID, } = {}) {
    return `/roles/${roleID}/member/${userID}`
  }

  // Search users (Directory)
  async userList ({query, username, email, } = {}) {


    let cfg = {
      method: 'get',
      url: this.userListEndpoint({  }),
    }
    cfg.params = {
      query,
      username,
      email,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  userListEndpoint () {
    return `/users/`
  }

  // Create user
  async userCreate ({email, name, handle, kind, } = {}) {
    if (!email) {
      throw Error('Field email is empty')
    }

    let cfg = {
      method: 'post',
      url: this.userCreateEndpoint({  }),
    }

    cfg.data = {
      email,
      name,
      handle,
      kind,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  userCreateEndpoint () {
    return `/users/`
  }

  // Update user details
  async userUpdate ({userID, email, name, handle, kind, } = {}) {
    if (!userID) {
      throw Error('Field userID is empty')
    }
    if (!email) {
      throw Error('Field email is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'put',
      url: this.userUpdateEndpoint({
        userID,
      }),
    }

    cfg.data = {
      email,
      name,
      handle,
      kind,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  userUpdateEndpoint ({userID, } = {}) {
    return `/users/${userID}`
  }

  // Read user details and memberships
  async userRead ({userID, } = {}) {
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.userReadEndpoint({
        userID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  userReadEndpoint ({userID, } = {}) {
    return `/users/${userID}`
  }

  // Remove user
  async userDelete ({userID, } = {}) {
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.userDeleteEndpoint({
        userID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  userDeleteEndpoint ({userID, } = {}) {
    return `/users/${userID}`
  }

  // Suspend user
  async userSuspend ({userID, } = {}) {
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.userSuspendEndpoint({
        userID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  userSuspendEndpoint ({userID, } = {}) {
    return `/users/${userID}/suspend`
  }

  // Unsuspend user
  async userUnsuspend ({userID, } = {}) {
    if (!userID) {
      throw Error('Field userID is empty')
    }

    let cfg = {
      method: 'post',
      url: this.userUnsuspendEndpoint({
        userID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  userUnsuspendEndpoint ({userID, } = {}) {
    return `/users/${userID}/unsuspend`
  }

  // List applications
  async applicationList () {


    let cfg = {
      method: 'get',
      url: this.applicationListEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  applicationListEndpoint () {
    return `/application/`
  }

  // Create application
  async applicationCreate ({name, enabled, unify, config, } = {}) {
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'post',
      url: this.applicationCreateEndpoint({  }),
    }

    cfg.data = {
      name,
      enabled,
      unify,
      config,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  applicationCreateEndpoint () {
    return `/application/`
  }

  // Update user details
  async applicationUpdate ({applicationID, name, enabled, unify, config, } = {}) {
    if (!applicationID) {
      throw Error('Field applicationID is empty')
    }
    if (!name) {
      throw Error('Field name is empty')
    }

    let cfg = {
      method: 'put',
      url: this.applicationUpdateEndpoint({
        applicationID,
      }),
    }

    cfg.data = {
      name,
      enabled,
      unify,
      config,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  applicationUpdateEndpoint ({applicationID, } = {}) {
    return `/application/${applicationID}`
  }

  // Read application details
  async applicationRead ({applicationID, } = {}) {
    if (!applicationID) {
      throw Error('Field applicationID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.applicationReadEndpoint({
        applicationID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  applicationReadEndpoint ({applicationID, } = {}) {
    return `/application/${applicationID}`
  }

  // Remove application
  async applicationDelete ({applicationID, } = {}) {
    if (!applicationID) {
      throw Error('Field applicationID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.applicationDeleteEndpoint({
        applicationID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  applicationDeleteEndpoint ({applicationID, } = {}) {
    return `/application/${applicationID}`
  }

  // Retrieve defined permissions
  async permissionsList () {


    let cfg = {
      method: 'get',
      url: this.permissionsListEndpoint({  }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsListEndpoint () {
    return `/permissions/`
  }

  // Effective rules for current user
  async permissionsEffective ({resource, } = {}) {


    let cfg = {
      method: 'get',
      url: this.permissionsEffectiveEndpoint({  }),
    }
    cfg.params = {
      resource,
    }

    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsEffectiveEndpoint () {
    return `/permissions/effective`
  }

  // Retrieve role permissions
  async permissionsRead ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'get',
      url: this.permissionsReadEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsReadEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

  // Remove all defined role permissions
  async permissionsDelete ({roleID, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }

    let cfg = {
      method: 'delete',
      url: this.permissionsDeleteEndpoint({
        roleID,
      }),
    }


    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsDeleteEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

  // Update permission settings
  async permissionsUpdate ({roleID, rules, } = {}) {
    if (!roleID) {
      throw Error('Field roleID is empty')
    }
    if (!rules) {
      throw Error('Field rules is empty')
    }

    let cfg = {
      method: 'patch',
      url: this.permissionsUpdateEndpoint({
        roleID,
      }),
    }

    cfg.data = {
      rules,
    }
    return new Promise((resolve, reject) => {
      this.api().request(cfg).then(this.stdResolve(resolve, reject), this.stdReject(reject))
    })
  }

  permissionsUpdateEndpoint ({roleID, } = {}) {
    return `/permissions/${roleID}/rules`
  }

}
