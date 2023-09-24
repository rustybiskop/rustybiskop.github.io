import { Decrypt } from "./encryption/encrypt.js";

import fileNames from "./fileNames.js";

export async function importTrendingFiles() {
  try {
    const names = fileNames.filter(name => name.includes("trending_movie_links"));

    if (names?.length) {
      return await cipherText(names);
    }
  } catch (err) {
    console.log(err.message);
  }
}

export async function importRecommendedFiles() {
  try {
    const names = fileNames.filter(name => name.includes("searched_movie_links"));

    if (names?.length) {
      return await cipherText(names);
    }
  } catch (err) {
    console.log(err.message);
  }
}

/**
 *
 * @param {array} names
 * @description reads ciphertext of given file names, decrypts it and returns the contents
 * @returns array of objects
 */
async function cipherText(names) {
  try {
    let object = {
      movieLinks: [],
    };

    for (const name of names) {

      const url = `../database/${name}`,
        module = await import(url);
      const links = await module.links();

      for (const link of links) {
        const { movieLinks } = await Decrypt(link);
        object.movieLinks.push(...movieLinks);
      }
    }

    return object.movieLinks;
  } catch (err) {
    console.log(err.message);
  }
}
