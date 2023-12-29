import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full flex-col flex-center'>
      <h1 className='head_text text-left self-baseline'>
        <span className='blue_gradient'>{name == "My" ? name : name + "'s"} Profile</span>
      </h1>
      <p className='desc text-left self-baseline'>{desc}</p>

      <div className="w-full flex flex-center">
        <div className='mt-10 prompt_layout mb-10 w-full'>
          {data.map((post) => (
            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;