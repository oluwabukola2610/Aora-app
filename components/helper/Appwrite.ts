import { Alert } from "react-native";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Models,
  Query,
  QueryTypesList,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.aora.mobile",
  projectId: "66604f62001bddf96eb7",
  databaseId: "66617dab0030050730aa",
  userCollectionId: "66617dfb0027b29e0541",
  videoCollectionId: "66617e4a0001c4ec4b1e",
  storageId: "66618690000d225abb9e",
};

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(
  email: string,
  password: string,
  username: string | undefined
) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(username);

    await LoginUser(email, password);

    // Create a user document in the database
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    Alert.alert("Error", `Failed to create user`);
  }
}

// Logout active session
export const logoutSession = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};
// login user
export async function LoginUser(email: string, password: string) {
  try {
    const session = await account.getSession("current").catch(() => null);
    if (session) {
      await logoutSession();
    }
    const newSession = await account.createEmailPasswordSession(
      email,
      password
    );
    await getCurrentUser();
    return newSession;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error("Failed to sign in. Please try again.");
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}
// Get all video Posts
export async function getAllPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
}
//   // Get latest created video posts
export async function getLatestPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
}

//   // Upload File
export async function uploadFile(file: any, type: any) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId: string, type: string) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

//   // Create Video Post
export async function createVideoPost(form: {
  thumbnail: any;
  video: any;
  title: any;
  prompt: any;
  userId: any;
}) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

//   // Get video posts created by user
export async function getUserPosts(
  userId: string | number | boolean | QueryTypesList
) {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.equal("creator", userId)]
    );

    return posts.documents;
  } catch (error) {
    console.log(error);
  }
}

//   // Get video posts that matches search query
export async function searchPosts(
  query: string
): Promise<Models.Document[] | undefined> {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
