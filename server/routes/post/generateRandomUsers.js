import fs from 'fs'
import random_name from 'node-random-name'

import User from '../../database/models/user.js'

export const generateRandomFemaleUsers = () => {
  const levels = ['Noob', 'Advanced', 'God']
  const testFolder = 'server/assets/uploads/females/'

  const images = fs
    .readdirSync(testFolder, { withFileTypes: true })
    .filter(item => !item.isDirectory() && item.name !== '.DS_Store')
    .map(item => item.name)

  for (const image of images) {
    setTimeout(() => {
      const randomName = random_name({ first: true, gender: 'female' })
      const randomAge = Math.floor(Math.random() * 10) + 18
      const randomLevel = levels[Math.floor(Math.random() * levels.length)]

      const newUser = new User({
        username: randomName,
        password: '123456',
        name: randomName,
        age: randomAge,
        gender: 'Female',
        attraction: 'Males',
        fromAge: 18,
        toAge: 30,
        level: randomLevel,
        avatar: `/assets/uploads/females/${image}`,
        firstVisit: false,
      })

      User.findOne({ username: randomName }, (err, result) => {
        if (result === null) {
          newUser.save()
        }
      })
    }, 50)
  }
}

export const generateRandomMaleUsers = () => {
  const levels = ['Noob', 'Advanced', 'God']
  const testFolder = 'server/assets/uploads/males/'

  const images = fs
    .readdirSync(testFolder, { withFileTypes: true })
    .filter(item => !item.isDirectory() && item.name !== '.DS_Store')
    .map(item => item.name)

  for (const image of images) {
    setTimeout(() => {
      const randomName = random_name({ first: true, gender: 'male' })
      const randomAge = Math.floor(Math.random() * 10) + 18
      const randomLevel = levels[Math.floor(Math.random() * levels.length)]

      const newUser = new User({
        username: randomName,
        password: '123456',
        name: randomName,
        age: randomAge,
        gender: 'Male',
        attraction: 'Females',
        fromAge: 10,
        toAge: 30,
        level: randomLevel,
        avatar: `/assets/uploads/males/${image}`,
        firstVisit: false,
      })

      User.findOne({ username: randomName }, (err, result) => {
        if (result === null) {
          newUser.save()
        }
      })
    }, 50)
  }
}
