"""sort_order for questions

Revision ID: 3fa3b32a5938
Revises: 2a7a723f5fc3
Create Date: 2024-01-17 17:18:37.032280

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3fa3b32a5938'
down_revision = '2a7a723f5fc3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('energy_assessment_questions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('sort_order', sa.Integer()))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('energy_assessment_questions', schema=None) as batch_op:
        batch_op.drop_column('sort_order')

    # ### end Alembic commands ###
