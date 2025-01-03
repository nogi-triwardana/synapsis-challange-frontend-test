import { HttpResponse, http } from "msw";
import { dummyData } from "./dummy";

const mapData = new Map();

dummyData.forEach(data => (
  mapData.set(data?.id, { 
    id: data?.id, 
    title: data?.title, 
    body: data?.body, 
    user_id: data?.user_id 
  })
));

const handlers = [
  http.get(`/posts`, () => {
    return HttpResponse.json({
      data: Array.from(mapData.values())
    })
  }),
  http.get(`/posts/:id`, ({ params }) => {
    const { id } = params;
    
    return HttpResponse.json({
      data: mapData.get(parseInt(id as string))
    });
  }),
  http.post(`/posts`, async ({ request }) => {
    const newPost = await request.json();
    const id = Math.floor(Math.random() * 100000);

    mapData.set(id, newPost);

    return HttpResponse.json(newPost, { status: 201 })
  }),
  http.delete('/posts/:id', ({ params }) => {
    const { id } = params;
    const deletedPost = mapData.get(parseInt(id as string));

    if (!deletedPost) {
      return HttpResponse.json({ message: 'Success deleted post', status: 404 });
    }

    mapData.delete(id);

    return HttpResponse.json(deletedPost);
  })
];

export default handlers;