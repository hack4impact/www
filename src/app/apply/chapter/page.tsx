import { getChapterApply, getNonprofitApply } from '@/lib/api';
import Apply from '../apply';


export default async function ChapterApply() {
  const chapterApplication = await getChapterApply();

  return Apply(chapterApplication.props);
}
