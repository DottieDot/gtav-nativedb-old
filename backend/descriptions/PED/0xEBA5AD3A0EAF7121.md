Gets the relationship between two peds. This should be called twice (once for each ped).

Relationship types:
0 = Companion
1 = Respect
2 = Like
3 = Neutral
4 = Dislike
5 = Hate
255 = Pedestrians
(Credits: Inco)

Example:
PED::GET_RELATIONSHIP_BETWEEN_PEDS(2, l_1017, 0xA49E591C);
PED::GET_RELATIONSHIP_BETWEEN_PEDS(2, 0xA49E591C, l_1017);