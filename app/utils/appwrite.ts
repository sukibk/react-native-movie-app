import { Client, Databases, Query, ID, Account } from "react-native-appwrite";
import { Models } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const FAVORITES_COLLECTION_ID =
  process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!;

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    console.log("Search count result:", result);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          count: existingMovie.count + 1,
        }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc("count"),
    ]);

    return result.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Authentication
const account = new Account(client);

// Create Account
export const createAccount = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const result = await account.create(ID.unique(), email, password, name);
    return result;
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

// Log In
export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

// Get Current User
export const getCurrentUser =
  async (): Promise<Models.User<Models.Preferences> | null> => {
    try {
      return await account.get();
    } catch (error) {
      console.error("Failed to get current user:", error);
      return null;
    }
  };

// Log Out
export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

// Add to favorites
export const addFavorite = async (userId: string, movie: MovieDetails) => {
  return await database.createDocument(
    DATABASE_ID,
    "67f72a9c003d24547069",
    ID.unique(),
    {
      userId,
      movieId: movie.id,
      title: movie.title,
      posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    }
  );
};

// Remove from favorites
export const removeFavorite = async (docId: string) => {
  return await database.deleteDocument(
    DATABASE_ID,
    "67f72a9c003d24547069",
    docId
  );
};

// Get favorite (by user and movie)
export const getFavorite = async (userId: string, movieId: number) => {
  const result = await database.listDocuments(
    DATABASE_ID,
    "67f72a9c003d24547069",
    [Query.equal("userId", userId), Query.equal("movieId", movieId)]
  );
  return result.documents?.[0]; // either the document or undefined
};

export const getFavorites = async (userId: string) => {
  const res = await database.listDocuments(
    DATABASE_ID,
    FAVORITES_COLLECTION_ID,
    [Query.equal("userId", userId)]
  );
  return res.documents;
};
