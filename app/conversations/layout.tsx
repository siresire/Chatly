import getConversations from "../actions/getConversations";
import getUsers from "../actions/getUsers";
import Sidebar from "../components/sidebar/Sidebar";
import ConversationList from "./components/ConversationList";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getConversations();
  // geting uses for the group conversation
  const users = await getUsers();

  return (

    <Sidebar>
      <div className="h-full">
        <ConversationList 
        // passing the users list in the list
          users={users} 
          title="Messages"  
          initialItems={conversations}
        />
        {children}
      </div>
    </Sidebar>
  );
}