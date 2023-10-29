import NextAuth from 'next-auth'
import DiscordProvider from "next-auth/providers/discord";
import prisma from '@/utils/prisma'

const handler = NextAuth({
    secret: "krigoloh",
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "identify guilds guilds.members.read"
                }
            },
        }),
    ],
    callbacks: {
        async signIn({ account, user }) {
            const { access_token, providerAccountId: discordId } = account;
            
            const response = await fetch("https://discord.com/api/v10/users/@me/guilds", {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const guilds = await response.json();
    
            const desiredGuild = guilds.find((guild) => guild.name === "Инспекционная служба");
            if (!desiredGuild) {
                return false;
            }
    
            const nicknameResponse = await fetch(`https://discord.com/api/v10/users/@me/guilds/${desiredGuild.id}/member`, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            const nicknameData = await nicknameResponse.json();
    
            if (!nicknameData.nick) {
                console.error("User does not have a nickname on the server");
                return false;
            }
    
            const nickname = nicknameData.nick.replace(/\s/g, '');
            const [idn, rank, callSign] = nickname.split('|');
    
            if (!idn || !rank || !callSign) {
                console.error("User's nickname does not match the expected format");
                return false;
            }
    
            try {
                const existingInspector = await prisma.inspector.findUnique({
                    where: {
                        discordId: discordId,
                    },
                });
            
                if (!existingInspector) {
                    await prisma.inspector.create({
                        data: {
                            discordId,
                            idn,
                            rank,
                            callSign,
                        },
                    });
                }
            } catch (error) {
                console.error("Failed to create inspector:", error);
                return false;
            }
            
            return true;
        },

        async session(session) {
            const id = session.token.sub;
            const inspector = await prisma.inspector.findUnique({
                where: {
                    discordId: id,
                },
            });
            if (!inspector) {
                return session;
            }

            return {
                ...session,
                user: {
                    ...session.user,
                    id: inspector.id,
                    discordId: inspector.discordId,
                    idn: inspector.idn,
                    rank: inspector.rank,
                    callSign: inspector.callSign,
                },
            };
        }
    },    
})

export { handler as GET, handler as POST }