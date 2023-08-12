import { fetchCommunities } from '@/lib/actions/community.actions';

export default async function Page() {
  const { communities } = await fetchCommunities({
    searchString: 'yuran',
    pageNumber: 1,
    pageSize: 20,
    sortBy: 'desc',
  });

  console.log(communities);

  return <></>;
}
