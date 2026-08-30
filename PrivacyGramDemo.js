import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StatusBar,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Demo Data
const DEMO_POSTS = [
  {
    id: 1,
    author: 'Raj Kumar',
    avatar: 'https://via.placeholder.com/50',
    image: 'https://via.placeholder.com/400x500',
    caption: 'Beautiful sunset 🌅',
    likes: 234,
    comments: 45,
    timestamp: '2 hours ago',
    liked: false,
  },
  {
    id: 2,
    author: 'Priya Singh',
    avatar: 'https://via.placeholder.com/50',
    image: 'https://via.placeholder.com/400x500',
    caption: 'Morning coffee ☕ #CoffeeLovers',
    likes: 567,
    comments: 89,
    timestamp: '4 hours ago',
    liked: false,
  },
];

const DEMO_MESSAGES = [
  {
    id: 1,
    name: 'Amit Patel',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: 'Hey, how are you? 👋',
    time: '2:30 PM',
    unread: true,
  },
  {
    id: 2,
    name: 'Neha Sharma',
    avatar: 'https://via.placeholder.com/50',
    lastMessage: 'See you tomorrow! 😊',
    time: '1:15 PM',
    unread: false,
  },
];

export default function PrivacyGramDemo() {
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState(DEMO_POSTS);

  // Like toggle function
  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  // Home Screen
  const HomeScreen = () => (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>PrivacyGram 🔐</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15 }}>
            <Ionicons name="send-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
        <View style={styles.storyItem}>
          <View style={styles.storyCircle}>
            <Text style={styles.storyPlus}>+</Text>
          </View>
          <Text style={styles.storyText}>Your Story</Text>
        </View>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.storyItem}>
            <Image
              source={{ uri: `https://via.placeholder.com/60` }}
              style={styles.storyCircle}
            />
            <Text style={styles.storyText}>User {item}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Posts */}
      {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          {/* Post Header */}
          <View style={styles.postHeader}>
            <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
            <View style={styles.postInfo}>
              <Text style={styles.postAuthor}>{post.author}</Text>
              <Text style={styles.postTime}>{post.timestamp}</Text>
            </View>
            <TouchableOpacity>
              <MaterialCommunityIcons name="dots-vertical" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Post Image */}
          <Image source={{ uri: post.image }} style={styles.postImage} />

          {/* Post Actions */}
          <View style={styles.postActions}>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => toggleLike(post.id)}>
                <Ionicons
                  name={post.liked ? 'heart' : 'heart-outline'}
                  size={24}
                  color={post.liked ? '#e74c3c' : '#000'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 15 }}>
                <Ionicons name="chatbubble-outline" size={24} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 15 }}>
                <Ionicons name="share-social-outline" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          {/* Likes & Caption */}
          <View style={styles.postContent}>
            <Text style={styles.likes}>{post.likes} likes</Text>
            <Text style={styles.caption}>
              <Text style={styles.captionAuthor}>{post.author} </Text>
              {post.caption}
            </Text>
            <TouchableOpacity>
              <Text style={styles.viewComments}>View all {post.comments} comments</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  // Messages Screen
  const MessagesScreen = () => (
    <View style={styles.container}>
      {/* Messages Header */}
      <View style={styles.messagesHeader}>
        <Text style={styles.messagesTitle}>Messages</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="pencil-box-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Messages List */}
      <ScrollView style={styles.messagesList}>
        {DEMO_MESSAGES.map((message) => (
          <TouchableOpacity key={message.id} style={styles.messageItem}>
            <Image source={{ uri: message.avatar }} style={styles.messageAvatar} />
            <View style={styles.messageContent}>
              <Text style={styles.messageName}>{message.name}</Text>
              <Text style={styles.messageText} numberOfLines={1}>
                {message.lastMessage}
              </Text>
            </View>
            <View style={styles.messageRight}>
              <Text style={styles.messageTime}>{message.time}</Text>
              {message.unread && <View style={styles.unreadDot} />}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // Profile Screen
  const ProfileScreen = () => (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.profileUsername}>your_username</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="menu" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.profileAvatar}
        />
        <View style={styles.profileStats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1.2K</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>523</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>

      {/* Bio */}
      <View style={styles.bio}>
        <Text style={styles.bioName}>Your Name</Text>
        <Text style={styles.bioText}>Privacy Focused | Always Secure 🔐</Text>
        <Text style={styles.bioLink}>privacygram.com</Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Privacy Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Privacy Settings</Text>
        
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Private Account</Text>
            <Text style={styles.settingDesc}>Control who sees your profile</Text>
          </View>
          <View style={styles.toggle}>
            <View style={[styles.toggleCircle, { marginLeft: 3 }]} />
          </View>
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Message Requests</Text>
            <Text style={styles.settingDesc}>Allow messages from followers only</Text>
          </View>
          <View style={[styles.toggle, { backgroundColor: '#2ecc71' }]}>
            <View style={[styles.toggleCircle, { marginLeft: 20 }]} />
          </View>
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.settingTitle}>Hide Last Seen</Text>
            <Text style={styles.settingDesc}>Don't show your last seen status</Text>
          </View>
          <View style={[styles.toggle, { backgroundColor: '#2ecc71' }]}>
            <View style={[styles.toggleCircle, { marginLeft: 20 }]} />
          </View>
        </View>
      </View>

      {/* Blocked Users */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <TouchableOpacity style={styles.securityItem}>
          <MaterialCommunityIcons name="block-helper" size={20} color="#e74c3c" />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.securityTitle}>Blocked Users</Text>
            <Text style={styles.securityDesc}>Manage blocked accounts</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.securityItem}>
          <MaterialCommunityIcons name="lock" size={20} color="#3498db" />
          <View style={{ flex: 1, marginLeft: 15 }}>
            <Text style={styles.securityTitle}>Two-Factor Authentication</Text>
            <Text style={styles.securityDesc}>Add an extra layer of security</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.fullContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Content */}
      {activeTab === 'home' && <HomeScreen />}
      {activeTab === 'messages' && <MessagesScreen />}
      {activeTab === 'profile' && <ProfileScreen />}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={24}
            color={activeTab === 'home' ? '#000' : '#999'}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('messages')}
        >
          <Ionicons
            name={activeTab === 'messages' ? 'chatbubble' : 'chatbubble-outline'}
            size={24}
            color={activeTab === 'messages' ? '#000' : '#999'}
          />
          {DEMO_MESSAGES.some((m) => m.unread) && (
            <View style={styles.badge} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="add-circle-outline" size={28} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="heart-outline" size={24} color="#999" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={24}
            color={activeTab === 'profile' ? '#000' : '#999'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 60,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },

  // Stories
  storiesContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  storyCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  storyPlus: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#666',
  },
  storyText: {
    fontSize: 12,
    marginTop: 5,
    color: '#333',
  },

  // Post
  postContainer: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  postInfo: {
    flex: 1,
    marginLeft: 10,
  },
  postAuthor: {
    fontWeight: '600',
    color: '#000',
  },
  postTime: {
    fontSize: 12,
    color: '#999',
  },
  postImage: {
    width: '100%',
    height: 400,
    backgroundColor: '#f0f0f0',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  postContent: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  likes: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 5,
  },
  caption: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  captionAuthor: {
    fontWeight: '600',
  },
  viewComments: {
    color: '#999',
    fontSize: 13,
  },

  // Messages
  messagesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  messagesTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
  },
  messagesList: {
    paddingHorizontal: 10,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
  },
  messageAvatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#ddd',
  },
  messageContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageName: {
    fontWeight: '600',
    fontSize: 15,
  },
  messageText: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
  },
  messageRight: {
    alignItems: 'flex-end',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2ecc71',
    marginTop: 5,
  },

  // Profile
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  profileUsername: {
    fontSize: 18,
    fontWeight: '600',
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  profileStats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  bio: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  bioName: {
    fontWeight: '600',
    fontSize: 14,
  },
  bioText: {
    fontSize: 13,
    color: '#333',
    marginTop: 3,
  },
  bioLink: {
    color: '#3498db',
    fontSize: 12,
    marginTop: 3,
  },
  editButton: {
    marginHorizontal: 15,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },

  // Sections
  section: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingTitle: {
    fontWeight: '500',
    fontSize: 14,
  },
  settingDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ddd',
    justifyContent: 'center',
  },
  toggleCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },

  // Security
  securityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  securityTitle: {
    fontWeight: '500',
    fontSize: 14,
  },
  securityDesc: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },

  // Buttons
  logoutButton: {
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#e74c3c',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e74c3c',
  },
});