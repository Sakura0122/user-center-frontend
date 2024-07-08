export type LoginParams = {
  userAccount: string
  userPassword: string
}

export type RegisterParams = {
  checkPassword: string
} & LoginParams

export type UserInfo = {
  /**
   * 用户头像
   */
  avatarUrl: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 性别
   */
  gender: number
  /**
   * id
   */
  id: string
  /**
   * 是否删除
   */
  isDelete: number
  /**
   * 电话
   */
  phone: string
  /**
   * 更新时间
   */
  updateTime: string
  /**
   * 账号
   */
  userAccount: string
  /**
   * 用户昵称
   */
  username: string
  /**
   * 密码
   */
  userPassword: string
  /**
   * 角色 0-普通用户 1-管理员
   */
  userRole: number
  /**
   * 用户状态 0-正常
   */
  userStatus: number
}
