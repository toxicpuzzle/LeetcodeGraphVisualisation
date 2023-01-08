import requests
import sqlite3
import json
API_URL_ALL = "https://leetcode.com/api/problems/all/"
API_URL_GQL = "https://leetcode.com/graphql"
FILE_NAME = ""
LIMIT = float('inf');

gql_questiondata_query = """
    query questionData($titleSlug: String!) {
        question(titleSlug: $titleSlug) {
            questionId
            title
            difficulty
            likes
            dislikes
            similarQuestions
            topicTags {
                name
            }
    }
}
"""
def gql_get_var(title_slug): return {"titleSlug": title_slug}

def main():
    request = requests.get(API_URL_ALL)
    db = sqlite3.connect("lcdata.db");
    data = request.json()
    graph = {}

    # Schema for data
    # Adjacency List [ Problem_name : neighbours (from another api call)]

    # Extract data from json
    i = 0
    for ssp in data["stat_status_pairs"]:
        if i == LIMIT:
            break
        stats = ssp["stat"]
        question_id = stats["question_id"]
        question_title = stats["question__title"]
        title_slug = stats["question__title_slug"]
        question_detail = requests.post(API_URL_GQL, json={
                                        "query": gql_questiondata_query, "variables": gql_get_var(title_slug)}).json()
        similar_q = question_detail["data"]["question"]["similarQuestions"]
        difficulty = question_detail["data"]["question"]["difficulty"]
        similar_q = json.loads(similar_q);

        topic_tags = question_detail["data"]["question"]["topicTags"]
        graph[question_title] = {"title": question_title,
                              "similar": similar_q, "tags": topic_tags, "id": int(question_id)}
        db.execute("INSERT INTO Questions VALUES (?, ?, ?);", (int(question_id), question_title, difficulty));
        for tag in topic_tags:
            db.execute("INSERT INTO QuestionTags VALUES (?, ?);", (int(question_id), tag["name"]))
        i += 1
        print(f"processed {question_id}")

    # Load into table information about similar questions
    for node in graph.keys():
        for sn in graph[node]["similar"]:
            similar_node_title = sn["title"];
            db.execute("INSERT INTO SimilarTo VALUES (?, ?);", (graph[node]["id"], graph[similar_node_title]["id"]));
    
    db.commit();
    
    print(graph)

# Entities = Nodes (id, title, tags (multi_valued)), tags
# Relationships = Similar To (Many to Many), Taggs (Many to Many)
# Store in memory, and all API has to look at is query the database.
"""

"""
"""
CREATE TABLE Questions (
    id INTEGER PRIMARY KEY,
    title VARCHAR(50),
    difficulty VARCHAR(20)
);

CREATE TABLE SimilarTo(
    id_1 INTEGER REFERENCES Question(id) NOT NULL,
    id_2 INTEGER REFERENCES Question(id) NOT NULL
);

CREATE TABLE QuestionTags(
    id INTEGER REFERENCES Question(id) NOT NULL,
    tag_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (id, tag_name)
);

"""

main()
