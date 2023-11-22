import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth";

import { pusherServer } from "@/app/libs/pusher";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function handler(
  request: NextApiRequest, 
  response: NextApiResponse
) {
  const session = await getServerSession(request, response, authOptions);

  // If the user is not authenticated, return a 401 status code.
  if (!session?.user?.email) {
    return response.status(401);
  }

  // If the user is authenticated, return their Pusher auth using socket_auth
  const socketId = request.body.socket_id;
  const channel = request.body.channel_name;
  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return response.send(authResponse);
};
